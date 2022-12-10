import { useState, useEffect, useCallback } from 'react';
import { FegyverEditor } from './admin/FegyverEditor';
import { KasztEditor } from './admin/KasztEditor';
import { KepzettsegEditor } from './admin/KepzettsegEditor';

import { Karakter } from './model/Karakter';
import { KarakterTemplateWdiget } from './widgets/KarakterTemplateWidget';
import { KarakterWidget } from './widgets/KarakterWidget';
import './styles.css';
import './dropdownmenu.css';


const App: React.FC<{}> = () => {


  const [karakterek, setKarakterek] = useState<Record<string, Karakter>>(() => JSON.parse(window.localStorage.getItem('karakterek') ?? '{}'));
  const [karakter, setKarakter] = useState<Karakter>();

  useEffect(() => {
    window.localStorage.setItem('karakterek', JSON.stringify(karakterek));
  }, [karakterek]);

  const save = useCallback((karakter: Karakter) => {
    setKarakterek({ ...karakterek, [karakter.id]: karakter });
    setKarakter(karakter);
  }, [karakterek]);

  return <div>
    <nav>
      <ul>
        <li>
          <span className='noselect'>
            {Object.keys(karakterek).length > 0 && <select value={karakter?.id ?? ''} onChange={e => setKarakter(karakterek[e.target.value])}>
              {!karakter && <option disabled value=''>Válassz karaktert</option>}
              {Object.entries(karakterek).map(([id, karakter]) => <option value={id}>{karakter.name} ({Object.values(Karakter.szintek(karakter)).map(sz => `${sz.name} ${sz.szint}`).join('/')})</option>)}
            </select>}
            <KarakterTemplateWdiget onCreate={save} />
          </span>
        </li>
        <li><span>Admin</span>
          <ul>
            <li><KepzettsegEditor /></li>
            <li><KasztEditor /></li>
            <li><FegyverEditor /></li>
            <li><button onClick={() => setKarakterek({})}>Reset</button></li>
          </ul>
        </li>
      </ul>
    </nav>
    {karakter &&
      <KarakterWidget karakter={karakter} setKarakter={save} deleteKarakter={() => {
        delete karakterek[karakter.id];
        setKarakterek({ ...karakterek })
        setKarakter(undefined);
      }} />
    }
  </div>;
};

export default App;
