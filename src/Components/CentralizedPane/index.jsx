import styles from './styles.module.css';

export const CentralizedPane = ({ children }) => {
    return (
        <div className={styles['site-background']}>
            <section className={styles['site-content']}>
                <header className={styles['site-header']} />

                <main>{children}</main>

                <footer className={styles['site-footer']} />
            </section>
        </div>
    );
};
