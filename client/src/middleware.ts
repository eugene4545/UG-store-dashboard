export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/inventory/:path*",
    "/users/:path*",
    "/expenses/:path*",
    "/settings/:path*",
  ],
};
