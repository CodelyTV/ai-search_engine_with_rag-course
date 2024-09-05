import "reflect-metadata";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

import { UserFinder } from "../../../../../contexts/mooc/users/application/find/UserFinder";
import { container } from "../../../../../contexts/shared/infrastructure/dependency-injection/diod.config";

const finder = container.get(UserFinder);

export async function GET(
	_request: Request,
	context: { params: Params },
): Promise<NextResponse> {
	const userId = context.params["user-id"] as string;

	try {
		const users = await finder.find(userId);

		return NextResponse.json(users.toPrimitives());
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
