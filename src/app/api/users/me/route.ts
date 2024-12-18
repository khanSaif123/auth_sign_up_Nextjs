import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function GET(request: NextRequest) {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    // if user is not there
    if (!user) {
        return NextResponse.json({ message: "Invalid Token" }, { status: 400 });
    }

    return NextResponse.json({
        message: "User Found",
        data: user,
    });
}
