import { NextFont } from "next/dist/compiled/@next/font"
import { Nunito, Vazirmatn } from "next/font/google"
const nunito = Nunito({ subsets: ['latin'] })
const vazirmant = Vazirmatn({ subsets: ['arabic'] })

const fonts: NextFont[] | NextFont = [nunito, vazirmant]

export default fonts