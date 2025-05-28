import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'

import InputError from '@/components/atoms/input-error'
import TextLink from '@/components/atoms/text-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/components/templates/auth-layout'

export default function ForgotPasswordPage({ status }: { status?: string }) {
	const { data, setData, post, processing, errors } = useForm<
		Required<{ email: string }>
	>({
		email: '',
	})

	function submit(e: React.FormEvent) {
		e.preventDefault()

		post(route('password.email'))
	}

	return (
		<AuthLayout
			title="Lupa Kata Sandi"
			description="Masukkan email Anda untuk menerima tautan atur ulang kata sandi"
		>
			<Head title="Lupa Kata Sandi" />

			{status && (
				<div className="mb-4 text-center text-sm font-medium text-green-600">
					{status}
				</div>
			)}

			<div className="space-y-6">
				<form onSubmit={submit}>
					<div className="grid gap-2">
						<Label htmlFor="email">Alamat Email</Label>
						<Input
							id="email"
							type="email"
							name="email"
							autoComplete="off"
							value={data.email}
							autoFocus
							onChange={(e) => setData('email', e.target.value)}
							placeholder="email@example.com"
						/>

						<InputError message={errors.email} />
					</div>

					<div className="my-6 flex items-center justify-start">
						<Button className="w-full" disabled={processing}>
							{processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
							Kirim Tautan Atur Ulang Kata Sandi
						</Button>
					</div>
				</form>

				<div className="text-muted-foreground space-x-1 text-center text-sm">
					<span>Atau, kembali ke</span>
					<TextLink href={route('login')}>masuk</TextLink>
				</div>
			</div>
		</AuthLayout>
	)
}
