export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/search/:path*",
    "/library/:path*",
    "/playlist/:path*",
    "/album/:path*",
    "/artist/:path*",
    "/liked/:path*",
    "/profile/:path*",
  ],
};
