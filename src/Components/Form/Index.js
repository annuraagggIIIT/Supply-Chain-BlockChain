import styles from "./../../style.module.scss";

function Form({ address, changeAddress, changeName,ProName, network, changeNetwork, invalidAddress }) {
    return (
        <div className={styles.Form}>
            <h2>Crypto Address QR-Code</h2>
            <form>

            <input
                    type="text"
                    placeholder="Enter the Product Name"
                    value={ProName}
                    onChange={changeName}
                    className={invalidAddress ? styles.dangerous : null}
                />
                <select value={network} onChange={changeNetwork}>
                    <option hidden>Select Crypto Network</option>
                    <option value="eth">Ethereum ( ETH )</option>
                    <option value="btc">Others </option>

                </select>
                
                <input
                    type="text"
                    value={address}
                    onChange={changeAddress}
                    className={invalidAddress ? styles.dangerous : null}
                />
            </form>
        </div>
    );
}

export default Form;
