import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'

import InputError from '@/components/atoms/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/components/templates/auth-layout'
import { ResetPasswordForm, ResetPasswordProps } from '@/types/auth'

export default function ResetPasswordPage({
	token,
	email,
}: ResetPasswordProps) {
	const { data, setData, post, processing, errors, reset } = useForm<
		Required<ResetPasswordForm>
	>({
		token: token,
		email: email,
		password: '',
		password_confirmation: '',
	})

	function submit(e: React.FormEvent) {
		e.preventDefault()

		post(route('password.store'), {
			onFinish: () => reset('password', 'password_confirmation'),
		})
	}

	return (
		<AuthLayout
			title="Atur Ulang Kata Sandi"
			description="Silakan masukkan kata sandi baru Anda di bawah ini"
		>
			<Head title="Atur Ulang Kata Sandi" />

			<form onSubmit={submit}>
				<div className="grid gap-6">
					<div className="grid gap-2">
						<Label htmlFor="email">Alamat Email</Label>
						<Input
							id="email"
							type="email"
							name="email"
							autoComplete="email"
							value={data.email}
							className="mt-1 block w-full"
							readOnly
							onChange={(e) => setData('email', e.target.value)}
						/>

						<InputError message={errors.email} className="mt-2" />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="password">Kata Sandi</Label>
						<Input
							id="password"
							type="password"
							name="password"
							autoComplete="new-password"
							value={data.password}
							className="mt-1 block w-full"
							autoFocus
							onChange={(e) => setData('password', e.target.value)}
							placeholder="Kata Sandi"
						/>

						<InputError message={errors.password} />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="password_confirmation">Konfirmasi Kata Sandi</Label>
						<Input
							id="password_confirmation"
							type="password"
							name="password_confirmation"
							autoComplete="new-password"
							value={data.password_confirmation}
							className="mt-1 block w-full"
							onChange={(e) => setData('password_confirmation', e.target.value)}
							placeholder="Konfirmasi kata sandi"
						/>

						<InputError
							message={errors.password_confirmation}
							className="mt-2"
						/>
					</div>

					<Button type="submit" className="mt-4 w-full" disabled={processing}>
						{processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
						Atur Ulang Kata Sandi
					</Button>
				</div>
			</form>
		</AuthLayout>
	)
}
