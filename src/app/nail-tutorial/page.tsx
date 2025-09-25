// app/pages/nail-prep/page.tsx (or any route)
import HowToSteps, { HowToStep } from '@/components/tutorial';

const STEPS: HowToStep[] = [
  {
    title: 'Step 1: Push Back Cuticles',
    description: 'Push back the cuticle using the cuticle tool provided.',
    image: '/images/prep/step1.jpg',
  },
  {
    title: 'Step 2: File & Shape',
    description: 'Lightly file and shape the free edge of your natural nails.',
    image: '/images/prep/step2.jpg',
  },
  {
    title: 'Step 3: Buff Surface',
    description: 'Gently buff to remove shine for better adhesion.',
    image: '/images/prep/step3.jpg',
  },
  {
    title: 'Step 4: Clean With Alcohol',
    description: 'Wipe each nail with an alcohol pad and let dry fully.',
    image: '/images/prep/step4.jpg',
  },
];

export default function NailPrepPage() {
  return <HowToSteps steps={STEPS} />;
}
