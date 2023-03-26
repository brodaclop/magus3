import { useState, useEffect, useCallback, useRef } from 'react';
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
import { SzabalyEditor } from './admin/SzabalyEditor';
import { AiOutlineImport } from 'react-icons/ai';

export const Main: React.FC<{}> = () => {

  const { karakterId, entityId } = useParams();

  const ujKarakter = useRef<string>();

  const navigate = useNavigate();

  const [karakterek, setKarakterek] = useState<Record<string, Karakter>>(() => JSON.parse(window.localStorage.getItem('karakterek') ?? '{}'));

  const save = useCallback((karakter: Karakter) => {
    setKarakterek({ ...karakterek, [karakter.id]: karakter });
  }, [karakterek]);

  const karakter = karakterId !== undefined ? karakterek[karakterId] : undefined;

  if (karakter) {
    Karakter.fixupLegacy(karakter);
  }

  useEffect(() => {
    if (karakterId !== undefined && karakter === undefined) {
      navigate('/');
    }
  }, [karakter, karakterId, navigate]);

  useEffect(() => {
    window.localStorage.setItem('karakterek', JSON.stringify(karakterek));
    if (ujKarakter.current) {
      navigate(`/karakter/${ujKarakter.current}`);
      ujKarakter.current = undefined;
    }
  }, [karakterek, ujKarakter, navigate]);


  return <div className='main'>
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
            <KarakterTemplateWdiget onCreate={karakter => {
              save(karakter);
              ujKarakter.current = karakter.id;
            }} />
          </span>
        </li>
        <li>
          <label style={{ marginRight: '0.2rem', border: 'black 1px solid', borderRadius: '0.1rem', backgroundColor: 'lightgray', padding: '2px' }}>
            <input
              type="file"
              accept="text/json"
              style={{ display: 'none' }}
              onChange={async e => {
                const k = JSON.parse(await e.target.files![0].text());
                if (k.id && k.name) {
                  Karakter.fixupLegacy(k);
                  ujKarakter.current = k.id;
                  save(k);
                }
                (e.target.value as any) = null;
              }}
            />
            <span><AiOutlineImport style={{ verticalAlign: 'text-bottom' }} /> Import</span>
          </label>
        </li>
        <li><span>Admin</span>
          <ul>
            <li><KepzettsegEditor /></li>
            <li><KasztEditor /></li>
            <li><FegyverEditor /></li>
            <li><VarázslatEditor /></li>
            <li><KpEditor /></li>
            <li><MpEditor /></li>
            <li><SzabalyEditor /></li>
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

