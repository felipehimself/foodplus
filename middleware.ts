import { withAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },

  {
    callbacks: {
      authorized({ token }) {
        return token?.role == 'admin';
      },
    },
  }
);

export const config = {
  matcher: ['/admin', '/admin/add-product', '/admin/all-products'],
};
