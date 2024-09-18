import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {};

export const actions: Actions = {
	default: async (event) => {
        console.log("event.locals: ", event.locals)
		if (!event.locals.session) {
			return fail(401);
		}

        console.log("event.locals: ", event.locals)
        console.log("event.locals.session: ", event.locals.session)
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();

        console.log("sessionCookie: ", sessionCookie)
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/");
	}
};