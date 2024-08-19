
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { useMutation } from '@tanstack/react-query'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import FillLoading from '../shared/fill-loading'
import $api from '@/http/api'
import { toast } from 'sonner'
import { ConfirmBooking } from '@/hooks/use-booking'

function BookingModal() {
	const { isOpen, onClose, eventId } = ConfirmBooking()

	const { mutate, error, isPending } = useMutation({
		mutationKey: ['create-booking'],
		mutationFn: async () => {
			const { data } = await $api.post(`/booking/create/`, { eventId })
			return data
		},
		onSuccess: () => {
			onClose()
			toast("Buyurtma qabul qilindi ")
		},
		onError: err => {
			// @ts-ignore
			toast(err.response.data.message)
		},
	})

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{error && (
					<Alert variant='destructive'>
						<AlertCircle className='h-4 w-4' />
						<AlertTitle>Error</AlertTitle>
						{/* @ts-ignore */}
						<AlertDescription>{error.response.data.message}</AlertDescription>
					</Alert>
				)}
				{isPending && <FillLoading />}
				<DialogHeader>
					<DialogTitle>Do you want to register for the event?</DialogTitle>
					<DialogDescription>
						By continuing you will be considered registered for this event. You can manage through your profile
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant={'destructive'} onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={() => mutate()}>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default BookingModal
