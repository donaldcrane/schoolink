import { DateTime } from "luxon";
import { ControllerParams, ServiceParams, response } from "../utils";

export const controller = async <T = unknown, R = unknown, F = unknown>({
  res,
  req,
  service,
  params = {},
  validation,
  filterValidation,
}: ControllerParams<T, R, F>) => {
  let result;

  params = {
    ...params,
    data: params?.data ?? req.body ?? {},
    filters: { ...req.query, ...(params.filters || {}) } as
      | F
      | { [key: string]: string },
    file: req.file as Express.Multer.File,
    files: req.files as Express.Multer.File[],
  };

  if (req.user) params.user = req.user;
  if (req.token) params.token = req.token;

  params.pagination = {
    page: Number((params.filters as { [key: string]: string })?.page ?? 0),
    size: Number((params.filters as { [key: string]: string })?.size ?? 10),
    totalItems: 0,
    totalPages: 0,
  };

  try {
    if (validation && params.data) {
      const { error, value: validatedData } = validation.schema
        .options(validation.options || {})
        .validate(params.data);

      if (error)
        result = response.badRequest(
          error.details.map((err) => err.message).join(", ")
        );
      else params = { ...params, validatedData };
    }

    if (filterValidation) {
      const { error, value: filters } = filterValidation.validate(
        params.filters
      );

      if (error)
        result = response.badRequest(
          error.details.map((err) => err.message).join(", ")
        );
      else params = { ...params, filters };
    }

    if (!result)
      result = await service(params as Required<ServiceParams<T, F>>);
  } catch (e) {
    console.error("controller error");
    console.error(e);
    result = response.serverError();
  }

  const { status, success, message, data } = result;

  console.info(
    `response (${DateTime.now().toISO()}): ${JSON.stringify({
      status,
      success,
      message,
    })}`
  );

  return res.status(status).send({ success, message, data });
};
