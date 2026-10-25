import App1 from "@/components/Demo"
import { ActionsExample } from "@/components/features/actions"
import Demo1 from "@/components/features/Demo1"
import RefAsPropsDemo from "@/components/features/ref-as-props"
import UseActionStateDemo from "@/components/features/use-action-state"
import UseFetchDemo from "@/components/features/use-fetch"
import UseFormStatusActionDemo from "@/components/features/use-form-status"
import UseOptimisticDemo from "@/components/features/use-optimistic"
import ProductsConsumer from "@/components/features/use-with-context/dataConsumer"
import { ProductsProvider } from "@/components/features/use-with-context/dataProvider"

const Demo = () => {
  return (
    <div className="container mx-auto py-10 px-4">
        <h1 className="text-6xl underline font-extrabold tracking-tight mb-4">Demo</h1>
        <h2 className="text-4xl underline font-bold tracking-tight mt-11">UseTransition</h2>
        <App1 />
         <h2 className="text-4xl underline font-bold tracking-tight mt-11 mb-10">ActionsDemo</h2>
         <ActionsExample />
         <h2 className="text-4xl underline font-bold tracking-tight mt-11 mb-10">Use Action state</h2>
         <UseActionStateDemo />
         <h2 className="text-4xl underline font-bold tracking-tight mt-11 mb-10">useFormStatus</h2>
         <UseFormStatusActionDemo />
         <h2 className="text-4xl underline font-bold tracking-tight mt-11 mb-10">useOptimistic</h2>
         <UseOptimisticDemo />
         <h2 className="text-4xl underline font-bold tracking-tight mt-11 mb-10">ref as pros </h2>
         <RefAsPropsDemo />
         <h2 className="text-4xl underline font-bold tracking-tight mt-11 mb-10">use </h2>
         <Demo1 />
         <h2 className="text-4xl underline font-bold tracking-tight mt-11 mb-10">context </h2>
         <ProductsProvider>
            <ProductsConsumer />
         </ProductsProvider>
    </div>
  )
}

export default Demo