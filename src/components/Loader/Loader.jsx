import css from './Loader.module.css'
import { FallingLines } from "react-loader-spinner";

export default function Loader() {
    return (
      <div className={css.backdrop}>
        <FallingLines position='center'/>;
      </div>
    );
    
}