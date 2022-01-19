import style from './styles.module.css';
import { CadastroTable } from '../Tables/CadastroTable';

export const TableGroup = () => {
    return (
        <div className={style['table-group']}>
            <nav className={style['table-nav-buttons']}>
                <ul className={style['button-group']}>
                    <li>
                        <button className={style.buttons}>DOCUMENTOS</button>
                    </li>

                    <li>
                        <button className={style.buttons}>CADASTROS</button>
                    </li>

                    <li>
                        <button className={style.buttons}>RECIBOS</button>
                    </li>
                </ul>
            </nav>
            <CadastroTable />
        </div>
    );
};
