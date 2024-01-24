import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from './utils/cn';
import { ClassValue } from 'clsx';

const useDrag = () => {
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && dragRef.current) {
      const elementWidth = dragRef.current!.offsetWidth;
      dragRef.current.style.top = `${e.clientY - 10}px`;
      dragRef.current.style.left = `${e.clientX - elementWidth / 2 + 5}px`;
    }
    e.preventDefault();
    e.stopPropagation();
  }, [isDragging])

  useEffect(() => {

    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    }

  }, [isDragging])

  return {
    isDragging,
    handleMouseDown,
    handleMouseUp,
    dragRef
  };
}


function Card({ children, className }: { children: React.ReactNode, className?: ClassValue }) {
  return (
    <div className={cn(className, 'bg-zinc-900 text-white rounded-lg shadow-lg p-6')}>
      {children}
    </div>
  )
}

function DraggableCard1() {

  const { handleMouseDown, handleMouseUp, dragRef, isDragging } = useDrag();

  return <div ref={dragRef} className={cn(isDragging ? "border-green-300 shadow-lg" : "shadow-md border-transparent", "border-2 z-10 absolute bottom-4 pt-5 pb-3 px-4 flex flex-col justify-start gap-3 text-white bg-zinc-800 rounded-md max-h-fit")}>

    <div onMouseDown={() => handleMouseDown()} onMouseUp={() => handleMouseUp()}
      className=' hover:cursor-grab active:cursor-grabbing hover:text-white absolute text-center text-sm p-[0.4%] top-0 rounded-md w-1/4 left-[36%] text-zinc-500'>
      <span className='!pointer-events-none'>
        :::
      </span>
    </div>
    <h2 className='text-base'>
      Command Injection
    </h2>

    <div className="flex flex-col items-start justify-center gap-2">
      <p className='text-sm'>
        - You should perform command <code className='bg-zinc-700 px-2 py-1 rounded-sm'>$ uname -a</code>
      </p>
      <p className='text-sm'>
        - You must enter here the flag that you'll get once <br />you've completed the command.
      </p>
    </div>

    <div>
      <input required type="text" name="domain" className='
      text-sm bg-zinc-700 text-white rounded-md
      outline-none focus:border focus:border-zinc-400 focus:outline focus:outline-offset-0 focus:outline-[rgba(255,255,255,0.1)]
      p-2 mt-2 w-full border border-transparent' placeholder="flag{}" />
      <button type='submit' className='bg-green-600 border-t-green-600 border-t-2 px-3 py-2 rounded-md shadow-sm text-sm mt-3 hover:bg-green-500'> Submit </button>
    </div>

  </div>
}



function App() {

  return (
    <div className='p-4 max-h-svh'>
      <DraggableCard1 />
      <section className="m-4 p-5 mx-auto max-w-5xl">
        <h1 className='md:text-3xl font-bold text-center dark:text-white text-zinc-800'>
          Welcome to Challenge #2
        </h1>

        <Card className="mt-5 shadow-md">
          <h2 className='text-xl'>
            Ping a domain
          </h2>
          <p className='text-gray-400'>
            This will ping a domain and return the results.
          </p>

          <form method="GET" action=''>
            <input required type="text" name="domain" className='
      text-sm bg-zinc-800 text-white rounded-lg 
      outline-none focus:border focus:border-zinc-400 focus:outline focus:outline-offset-0 focus:outline-[rgba(255,255,255,0.1)]
      p-2 mt-2 w-full border border-transparent' placeholder="example.com / 127.0.0.1" />
            {/* <input required type="text" name="domain" className='bg-zinc-800 text-white rounded-lg shadow-md p-2 mt-2 w-full' placeholder="example.com / 127.0.0.1" /> */}
            <button type='submit' className='bg-zinc-800 px-3 py-2 rounded-md shadow-sm text-base mt-3 hover:bg-zinc-700'> Ping </button>
          </form>

        </Card>

      </section>
    </div>
  )
}

export default App
