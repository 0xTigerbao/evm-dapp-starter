import {Button, Col, Modal, Row} from "antd";
import useAuth from "@/hooks/useAuth";
import {useAccount} from "wagmi";
import {walletsConfig} from "@/configs/wallets";
import {splitAddress} from "@/utils/splitAddress";
import {useCallback, useEffect, useState} from "react";

export default function ButtonConnect() {
    const {login, logout} = useAuth()
    const {address} = useAccount()
    const [account, setAccount] = useState<string | undefined>(undefined)
    const onConnect = useCallback(async (name: string) => {
        await login(name).then(() => Modal.destroyAll())
    }, [account])

    useEffect(() => {
        if (address) {
            setAccount(address)
        } else {
            setAccount(undefined)
        }
    }, [address])
    const toggle = async () => {
        if (address) {
            await logout()
        } else {
            Modal.info({
                title: "Connect Wallet",
                content: <Row>
                    {walletsConfig.map((wallet, index) => {
                        return <Col key={index}>
                            <div className="wallet-item" onClick={() => onConnect(wallet.connectorId)}>
                                <img src={wallet.icon} alt={wallet.title}/>
                            </div>
                        </Col>
                    })}
                </Row>
            })
        }
    }

    return <Button onClick={toggle}>
        {account ? splitAddress(account) : "Connect"}
    </Button>
}