import {TailChase} from 'ldrs/react';
import 'ldrs/react/TailChase.css';


export default function Loader() {

  return (
    <div>
      <TailChase
        size={25}
        speed={2}
        color='white'
      />
    </div>
  );
}