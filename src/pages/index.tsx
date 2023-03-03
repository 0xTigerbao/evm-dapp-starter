import ButtonConnect from "@/components/wallets/ButtonConnect";
import {useWeb3Active} from "@/hooks/useWeb3Active";

export default function Home() {
    const {provider} = useWeb3Active()
    return <ButtonConnect/>
}
