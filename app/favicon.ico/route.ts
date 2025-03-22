
import config from '@/config'
import { NextResponse } from 'next/server'
export async function GET(request: Request) {
  return NextResponse.redirect(new URL(config.logo, request.url))
}