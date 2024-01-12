import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { FileUpload } from './file-upload'

type Props = {
  form: UseFormReturn<{
    name: string
    imageUrl: string
  }>
  isLoading: boolean
}
export const InitialModalFormFields = ({ form, isLoading }: Props) => {
  return (
    <div className="space-y-8 px-6">
      <div className="flex items-center justify-center text-center">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload
                  endpoint="serverImage"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-xs font-bold text-zinc-500">
              Server name
            </FormLabel>
            <FormControl>
              <Input
                disabled={isLoading}
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                placeholder="Enter server name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
