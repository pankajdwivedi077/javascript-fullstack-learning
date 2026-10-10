import { ArrowLeft } from 'lucide-react';
import HeroText from './HeroText';

const LeftContent = () => {
  return (
    <div className="h-full w-1/3 flex flex-col justify-between">
         <HeroText />
         <ArrowLeft />
    </div>
  )
}

export default LeftContent