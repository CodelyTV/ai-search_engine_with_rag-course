/* eslint-disable camelcase */
import "reflect-metadata";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

import {
	UserFinder,
	UserFinderErrors,
} from "../../../../../contexts/mooc/users/application/find/UserFinder";
import { UserRegistrar } from "../../../../../contexts/mooc/users/application/registrar/UserRegistrar";
import { container } from "../../../../../contexts/shared/infrastructure/dependency-injection/diod.config";
import { executeWithErrorHandling } from "../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HttpNextResponse } from "../../../../../contexts/shared/infrastructure/http/HttpNextResponse";

export async function GET(
	_request: Request,
	context: { params: Params },
): Promise<NextResponse> {
	return executeWithErrorHandling(
		async () => {
			const finder = container.get(UserFinder);

			const userId = context.params["user-id"] as string;

			const user = await finder.find(userId);

			return NextResponse.json(user);
		},
		(error: UserFinderErrors) => {
			return HttpNextResponse.domainError(error, 404);
		},
	);
}

export async function PUT(
	request: Request,
	context: { params: Params },
): Promise<NextResponse> {
	return executeWithErrorHandling(async () => {
		const registrar = container.get(UserRegistrar);

		const id = context.params["user-id"] as string;
		const { name, email, profile_picture } = (await request.json()) as {
			name: string;
			email: string;
			profile_picture: string;
		};

		await registrar.registrar(id, name, email, profile_picture);

		return HttpNextResponse.created();
	});
}
