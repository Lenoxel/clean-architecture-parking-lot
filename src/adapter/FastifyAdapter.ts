export default class FastifyAdapter {
	static create(fn) {
		return async (request, reply) => {
			const obj = await fn(request.params, request.body);
			return reply.status(200).send(obj);
		}
	}
}