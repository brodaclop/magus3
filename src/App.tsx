import { useState } from 'react';
import ReactModal from 'react-modal';

import { Karakter, KarakterTemplate } from './model/Karakter';
import { KarakterTemplateWdiget } from './widgets/KarakterTemplateWidget';
import { KarakterWidget } from './widgets/KarakterWidget';


const App: React.FC<{}> = () => {

  const [karakter, setKarakter] = useState<Karakter>();
  const [template, setTemplate] = useState<KarakterTemplate>(Karakter.createTemplate());
  const [open, setOpen] = useState<boolean>(false);

  return <div>
    <button onClick={() => setOpen(true)}>Új karakter</button>
    <ReactModal style={{ content: { width: '400px', height: '200px' } }} isOpen={open} onRequestClose={() => setOpen(false)}>
      <KarakterTemplateWdiget onCreate={setKarakter} template={template} onChange={setTemplate} />
      <button onClick={() => setOpen(false)}>OK</button>
    </ReactModal>
    {karakter &&
      <KarakterWidget karakter={karakter} setKarakter={setKarakter} template={template} setTemplate={setTemplate} />
    }
  </div>;
};

export default App;
