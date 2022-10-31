import { useState } from 'react';

import { Karakter, KarakterTemplate } from './model/Karakter';
import { KarakterTemplateWdiget } from './widgets/KarakterTemplateWidget';
import { KarakterWidget } from './widgets/KarakterWidget';


const App: React.FC<{}> = () => {

  const [karakter, setKarakter] = useState<Karakter>(Karakter.create(Karakter.createTemplate()));
  const [template, setTemplate] = useState<KarakterTemplate>(Karakter.createTemplate());

  return <div>
    <KarakterTemplateWdiget onCreate={setKarakter} template={template} onChange={setTemplate} />
    <KarakterWidget karakter={karakter} setKarakter={setKarakter} template={template} setTemplate={setTemplate} />
  </div>;
};

export default App;
