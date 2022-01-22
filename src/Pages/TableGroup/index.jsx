import style from './styles.module.css';
import { TextDocument } from '@styled-icons/entypo/TextDocument';
import { FilePerson } from '@styled-icons/bootstrap/FilePerson';
import { CadastroTable } from '../Tables/CadastroTable';
import { DocumentsTable } from '../Tables/DocumentsTable';
import { useState } from 'react';

export const TableGroup = () => {
    // Two options: "documentos" or "cadastros"
    const [selectedTable, setSelectedTable] = useState('cadastros');

    const changeToDocumentos = () => {
        setSelectedTable('documentos');
    };

    const changeToCadastros = () => {
        setSelectedTable('cadastros');
    };

    return (
        <div className={style['table-group']}>
            <nav className={style['table-nav-buttons']}>
                <ul className={style['button-group']}>
                    <li>
                        <button
                            className={
                                style.buttons +
                                ' ' +
                                (selectedTable === 'cadastros' &&
                                    style['selected-button'])
                            }
                            onClick={changeToCadastros}
                        >
                            <FilePerson size={26} />
                            <p>CADASTROS</p>
                        </button>
                    </li>

                    <li>
                        <button
                            onClick={changeToDocumentos}
                            className={
                                style.buttons +
                                ' ' +
                                (selectedTable === 'documentos' &&
                                    style['selected-button'])
                            }
                        >
                            <TextDocument size={26} />
                            <p>DOCUMENTOS</p>
                        </button>
                    </li>
                </ul>
            </nav>
            {selectedTable === 'cadastros' ? (
                <CadastroTable />
            ) : (
                <DocumentsTable />
            )}
        </div>
    );
};
