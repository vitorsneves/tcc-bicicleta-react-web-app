import { Close } from '@styled-icons/zondicons/Close';
import formStyles from './form.module.css';

//------------------------------------> Return submit button.

export const SubmitSection = ({ onCancel }) => {
    return (
        <>
            {/* Submit and cancel buttons */}

            <div className={formStyles['submit-section']}>
                <button
                    className={formStyles['cancel-button']}
                    onClick={onCancel}
                >
                    <Close size={36} />
                    <p>voltar</p>
                </button>
                <input
                    className={formStyles['confirm-button']}
                    type="submit"
                    value="CONFIRMAR"
                />
            </div>

            {/* End of submit and cancel buttons */}
        </>
    );
};
