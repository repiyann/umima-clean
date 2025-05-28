import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'

import TextLink from '@/components/atoms/text-link'
import { Button } from '@/components/ui/button'
import AuthLayout from '@/components/templates/auth-layout'

export default function VerifyEmailPage({ status }: { status?: string }) {
	const { post, processing } = useForm({})

	function submit(e: React.FormEvent) {
		e.preventDefault()

		post(route('verification.send'))
	}

	return (
		<AuthLayout
			title="Verifikasi email"
			description="Silakan verifikasi alamat email Anda dengan mengklik tautan yang baru saja kami kirimkan melalui email."
		>
			<Head title="Verifikasi email" />

			{status === 'verification-link-sent' && (
				<div className="mb-4 text-center text-sm font-medium text-green-600">
					Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan
					saat pendaftaran.
				</div>
			)}

			<form onSubmit={submit} className="space-y-6 text-center">
				<Button disabled={processing} variant="secondary">
					{processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
					Kirim ulang email verifikasi
				</Button>

				<TextLink
					href={route('logout')}
					method="post"
					className="mx-auto block text-sm"
				>
					Keluar
				</TextLink>
			</form>
		</AuthLayout>
	)
}
