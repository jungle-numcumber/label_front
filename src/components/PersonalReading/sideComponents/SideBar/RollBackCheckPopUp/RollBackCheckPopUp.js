import styles from './RollBackCheckPopUp.module.css';

function RollBackCheckPopUp() {
    return (
        <div className={styles.wrap}>
            편집기의 내용이 해당 기록의 내용으로 돌아갑니다. 진행하시겠습니까?
            <div className={styles.yesButton}>Yes</div>
            <div className={styles.noButton}>No</div>
        </div>
    )
}

export default RollBackCheckPopUp;