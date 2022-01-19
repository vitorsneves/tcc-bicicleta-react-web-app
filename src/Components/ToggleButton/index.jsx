import styles from './toggle-btn.module.css'
import { useState } from 'react'

export const ToggleButton = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    
    // Sets the right text class name.
    const setTextColor = (option) => {
        // Tests if this is the selected option.
        if(selectedOption === options[option] ) {
            return styles["highligted-text"];
        }

        // Tests if it is not.
        if(selectedOption !== options[option]) {
            return styles["normal-text"];
        }
    }

    const handleClick = () => {
        if(selectedOption === options[0]) {
            setSelectedOption(options[1]);
        }

        if(selectedOption === options[1]) {
            setSelectedOption(options[0]);
        }
    }

    const highlightSide = () => {
        if(selectedOption === options[0]) {
            return styles["to-left"];
        }

        if(selectedOption === options[1]) {
            return styles["to-right"];
        }
    }

    return(
        <button onClick={handleClick}>
            {/* This div goes underneath the selected text */}
            <div className={styles["options-container"]}>
                <div className={styles.highlight + " " + highlightSide()}></div>

                {/* First option */}
                <p className={styles.text + " " + setTextColor(0)}>
                    {options[0]}
                </p>

                {/* Second Option */}
                <p className={styles.text + " " + setTextColor(1)}>
                    {options[1]}
                </p>
            </div>
        </button>
    );
}