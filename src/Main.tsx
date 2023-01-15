import { useState, useEffect, useCallback } from 'react';
import { FegyverEditor } from './admin/FegyverEditor';
import { KasztEditor } from './admin/KasztEditor';
import { KepzettsegEditor } from './admin/KepzettsegEditor';

import { Karakter } from './model/Karakter';
import { KarakterTemplateWdiget } from './widgets/KarakterTemplateWidget';
import { KarakterWidget } from './widgets/KarakterWidget';
import './styles.css';
import './dropdownmenu.css';
import 'react-responsive-modal/styles.css';
import { KpEditor } from './admin/KpEditor';
import { VarázslatEditor } from './admin/VarazslatEditor';
import { MpEditor } from './admin/MpEditor';
import { EntitySelector } from './widgets/EntitySelector';
import { EntityWidget } from './widgets/EntityWidget';
import { useNavigate, useParams } from "react-router-dom";

export const Main: React.FC<{}> = () => {

  const { karakterId, entityId } = useParams();

  const navigate = useNavigate();

  const [karakterek, setKarakterek] = useState<Record<string, Karakter>>(() => JSON.parse(window.localStorage.getItem('karakterek') ?? '{}'));

  const save = useCallback((karakter: Karakter) => {
    setKarakterek({ ...karakterek, [karakter.id]: karakter });
  }, [karakterek]);

  const karakter = karakterId !== undefined ? karakterek[karakterId] : undefined;

  useEffect(() => {
    if (karakterId !== undefined && karakter === undefined) {
      navigate('/');
    }
  }, [karakter, karakterId, navigate]);

  useEffect(() => {
    window.localStorage.setItem('karakterek', JSON.stringify(karakterek));
  }, [karakterek]);


  return <div>
    <nav>
      <ul>
        <li>
          <span className='noselect'>
            {Object.keys(karakterek).length > 0 && <select value={karakter?.id ?? ''} onChange={e => {
              navigate(`/karakter/${e.target.value}`);
            }}>
              {!karakter && <option key='' disabled value=''>Válassz karaktert</option>}
              {Object.entries(karakterek).map(([id, karakter]) => <option key={id} value={id}>{karakter.name} ({Object.values(Karakter.szintek(karakter)).map(sz => `${sz.name} ${sz.szint}`).join('/')})</option>)}
            </select>}
            <KarakterTemplateWdiget onCreate={save} />
          </span>
        </li>
        <li><span>Admin</span>
          <ul>
            <li><KepzettsegEditor /></li>
            <li><KasztEditor /></li>
            <li><FegyverEditor /></li>
            <li><VarázslatEditor /></li>
            <li><KpEditor /></li>
            <li><MpEditor /></li>
            <li><button onClick={() => setKarakterek({})}>Reset</button></li>
          </ul>
        </li>
        <li className='search-field'>
          <span className='noselect'>
            <div>
              <EntitySelector id={entityId} onChange={id => {
                navigate(`/entity/${id}`);
              }} />
            </div>
          </span>

        </li>
      </ul>
    </nav>
    {karakter &&
      <KarakterWidget karakter={karakter} setKarakter={save} deleteKarakter={() => {
        delete karakterek[karakter.id];
        setKarakterek({ ...karakterek })
        navigate('/');
      }} />
    }
    {entityId && <EntityWidget id={entityId} />}
  </div>;
};

