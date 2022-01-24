import { Close } from '@styled-icons/zondicons/Close';
import styles from './styles.module.css';

//------------------------------------> Return submit button.

export const SubmitSection = ({ onCancel }) => {
    return (
        <>
            {/* Submit and cancel buttons */}

            <div className={styles['submit-section']}>
                <button className={styles['cancel-button']} onClick={onCancel}>
                    <Close size={36} />
                    <p>voltar</p>
                </button>
                <input
                    className={styles['confirm-button']}
                    type="submit"
                    value="CONFIRMAR"
                />
            </div>

            {/* End of submit and cancel buttons */}
        </>
    );
};
