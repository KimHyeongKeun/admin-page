import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
} from "@mui/material";
import { PageContainer, Page } from "./index";
import { getCustomerList } from "../../axios/Customer";

export const CustomerTable = (props) => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const rowsPerPage = 6; // 한 페이지 당 데이터
  const [hasPage, setHasPage] = useState({ hasPrev: false, hasNext: false });

  useEffect(() => {
    getCustomerList(rowsPerPage, page - 1, "id", "id,desc")
      .then((res) => {
        setRows([]);
        setHasPage({ hasPrev: res.data.hasPrev, hasNext: res.data.hasNext });
        res.data.infoList.map((d) => {
          const row = createData(
            d.id,
            <Avatar
              alt="프로필 이미지"
              src={d.profileUrl}
              sx={{ width: 45, height: 45 }}
            >
              {d.name.charAt(0)}
            </Avatar>,
            d.name,
            d.email,
            d.phoneNumber,
            d.role,
            d.createdAt
          );
          setRows((rows) => [...rows, row]);
        });
      })
      .catch((err) => alert(err.response.data.error_message));
  }, [page]);

  function createData(
    id,
    profileUrl,
    name,
    email,
    phoneNumber,
    role,
    createdAt
  ) {
    return { id, profileUrl, name, email, phoneNumber, role, createdAt };
  }

  const columns = [
    { id: "id", label: "아이디", minWidth: 150, maxWidth: 320 },
    { id: "profileUrl", label: "프로필", minWidth: 50 },
    { id: "name", label: "이름", maxWidth: 150 },
    {
      id: "email",
      label: "이메일",
      minWidth: 170,
    },
    {
      id: "phoneNumber",
      label: "전화번호",
      minWidth: 120,
    },
    {
      id: "role",
      label: "role",
      minWidth: "70px",
    },
    {
      id: "createdAt",
      label: "가입 날짜",
      minWidth: 110,
    },
  ];

  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPage(newPage);
  };

  const Pages = () => {
    return (
      <PageContainer>
        <IconButton
          sx={{ visibility: !hasPage.hasPrev && "hidden" }}
          onClick={(e) => {
            handleChangePage(e, page - 1);
          }}
        >
          ←
        </IconButton>
        <Page>{page}</Page>
        <IconButton
          sx={{ visibility: !hasPage.hasNext && "hidden" }}
          onClick={(e) => {
            handleChangePage(e, page + 1);
          }}
        >
          →
        </IconButton>
      </PageContainer>
    );
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table aria-label="customer table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow sx={{ display: "block", padding: "16px" }}>
                데이터가 없습니다
              </TableRow>
            ) : (
              <></>
            )}
            {rows.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return <TableCell key={column.id}>{value}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pages />
    </Paper>
  );
};