import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { DialogFooter } from '~/components/ui/dialog'
import { Form } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { InitialModalFormFields } from './initial-modal-form-fields'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required.',
  }),
})

export const InitialModalForm = () => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers', values)

      form.reset()
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InitialModalFormFields form={form} isLoading={isLoading} />

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <Button variant="primary" disabled={isLoading}>
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
