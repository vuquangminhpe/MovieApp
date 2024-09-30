import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'

interface Props {
  ItemProps: TypeItem[]
}

interface TypeItem {
  id: string
  name: string
  children: React.ReactNode
}

export default function TabsSet({ ItemProps }: Props) {
  return (
    <Tabs defaultValue={ItemProps[0]?.id} className='w-full'>
      <TabsList className='flex gap-3 w-[470px] ml-10'>
        {ItemProps.map((item) => (
          <TabsTrigger className='ml-5 mr-2 text-black font-semibold text-sm' key={item.id} value={item.id}>
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {ItemProps.map((item) => (
        <TabsContent key={item.id} value={item.id}>
          {item.children}
        </TabsContent>
      ))}
    </Tabs>
  )
}
