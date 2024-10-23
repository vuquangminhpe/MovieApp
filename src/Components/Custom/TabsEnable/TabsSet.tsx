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
      <div className='w-full overflow-x-auto px-4 md:px-0'>
        <TabsList className='flex whitespace-nowrap md:max-w-[340px] md:ml-10 mb-4'>
          {ItemProps.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className='px-3 py-2 mx-1 md:mx-2 text-black font-semibold text-sm hover:bg-gray-100 transition-colors
                        data-[state=active]:bg-primary/10 data-[state=active]:text-primary'
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className='px-4 md:px-0'>
        {ItemProps.map((item) => (
          <TabsContent key={item.id} value={item.id} className='mt-4 focus-visible:outline-none focus-visible:ring-0'>
            {item.children}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
