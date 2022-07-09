import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { useRecoilValue } from "recoil";
import { loadingState } from "../../state/sharedState";
import "./style.scss";
export default function Loading() {
	const loading = useRecoilValue(loadingState);

	return (
		<React.Fragment>
			{loading ? (
				<Box sx={{ width: "100%" }} className="loading">
					<LinearProgress style={{ backgroundColor: "#0dcaf0" }} />
				</Box>
			) : null}
		</React.Fragment>
	);
}
