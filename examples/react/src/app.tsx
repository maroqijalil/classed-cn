import { classed } from '@tailwind-classed/cn-react';

const Component = classed('div', 'h-full w-full', 'flex justify-center');

export default function App() {
  return <Component>React</Component>;
}
