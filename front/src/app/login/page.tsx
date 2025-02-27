"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuthentication } from "@/contexts/AuthContext";
import { Button, Card, Input, Spacer } from "@heroui/react";
import { useState } from "react";

const validationSchema = Yup.object({
	email: Yup.string().email("Email inválido").required("Campo obrigatório"),
	password: Yup.string()
		.min(6, "Mínimo 6 caracteres")
		.required("Campo obrigatório"),
});

export default function LoginPage() {
	const { login } = useAuthentication();
	const [isLoading, setLoading] = useState(false);

	async function handleLogin(values: { email: string; password: string }) {
		setLoading(true);
		await login({ email: values.email, password: values.password });
		setLoading(false);
	}

	return (
		<div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#1e1e2f] to-[#12121c]">
			<Card className="max-w-xl p-8 backdrop-blur-lg bg-white/10 rounded-lg border border-white/20">
				<h1 className="text-center text-white text-2xl font-semibold">
					Login
				</h1>
				<Spacer y={1} />

				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={validationSchema}
					onSubmit={handleLogin}
				>
					{({ handleSubmit }) => (
						<Form onSubmit={handleSubmit}>
							<div>
								<Field
									as={Input}
									fullWidth
									isClearable
									name="email"
									placeholder="Email"
									className="text-white"
								/>
								<ErrorMessage
									name="email"
									component="div"
									className="text-red-500 text-sm"
								/>
							</div>

							<Spacer y={1} />

							<div>
								<Field
									as={Input}
									fullWidth
									type="password"
									name="password"
									placeholder="Senha"
									className="text-white"
								/>
								<ErrorMessage
									name="password"
									component="div"
									className="text-red-500 text-sm"
								/>
							</div>

							<Spacer y={1.5} />

							<Button
								type="submit"
								className="w-full shadow bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg"
								isLoading={isLoading}
								isDisabled={isLoading}
							>
								Entrar
							</Button>
						</Form>
					)}
				</Formik>
			</Card>
		</div>
	);
}
