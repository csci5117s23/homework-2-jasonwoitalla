import * as styles from "./RoundCheckbox.module.scss";

function RoundCheckbox(checked, onChange) {
    return (
        <input
            type="checkbox"
            className={styles.checkbox}
            onChange={onChange}
            checked={checked}
        />
    );
}

export default RoundCheckbox;
