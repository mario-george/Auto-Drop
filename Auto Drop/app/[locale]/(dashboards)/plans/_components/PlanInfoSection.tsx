import ExclamationSVG from '../images/ExclamationSVG';

interface PlanInfoSectionProps{
    upgradeOrRenew : string;
}
export default function PlanInfoSection(props:PlanInfoSectionProps){
    const {upgradeOrRenew} = props;
    return <>
    <div className="flex justify-center">

    <div className="flex space-s-12 bg-white rounded-xl shadow px-4 py-5 items-center my-3 w-[92%]">
    <ExclamationSVG/>
            <p className="font-semibold text-xl">{upgradeOrRenew}</p>
    </div>
    </div>
    </>
}