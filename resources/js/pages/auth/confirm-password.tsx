import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'

import InputError from '@/components/atoms/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/components/templates/auth-layout'

export default function ConfirmPasswordPage() {
	const { data, setData, post, processing, errors, reset } = useForm<
		Required<{ password: string }>
	>({
		password: '',
	})

	function submit(e: React.FormEvent) {
		e.preventDefault()

		post(route('password.confirm'), {
			onFinish: () => reset('password'),
		})
	}

	return (
		<AuthLayout
			title="Konfirmasi kata sandi"
			description="Ini adalah area aman aplikasi. Mohon konfirmasi kata sandi Anda sebelum melanjutkan."
		>
			<Head title="Konfirmasi kata sandi" />

			<form onSubmit={submit}>
				<div className="space-y-6">
					<div className="grid gap-2">
						<Label htmlFor="password">Kata Sandi</Label>
						<Input
							id="password"
							type="password"
							name="password"
							placeholder="Kata Sandi"
							autoComplete="current-password"
							value={data.password}
							autoFocus
							onChange={(e) => setData('password', e.target.value)}
						/>

						<InputError message={errors.password} />
					</div>

					<div className="flex items-center">
						<Button className="w-full" disabled={processing}>
							{processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
							Konfirmasi kata sandi
						</Button>
					</div>
				</div>
			</form>
		</AuthLayout>
	)
}
