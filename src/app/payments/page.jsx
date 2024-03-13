"use client";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { EditPayment } from "@/components/Navbar/EditPayment";
import { DeletePayment } from "@/components/Navbar/DeletePayment";
import { useDispatch, useSelector } from "react-redux";
import { listPayments, updateIsLoading } from "@/redux/features/paymentsSlice";

const feikData = [
  {
    concepto: 32,
    monto: 2000,
    ["día de pago"]: "19/03/2024",
    numFactura: 3,
  },
  {
    concepto: 33,
    monto: 12000,
    ["día de pago"]: "19/03/2024",
    numFactura: 4,
  },
  {
    concepto: 34,
    monto: 1000,
    ["día de pago"]: "19/04/2024",
    numFactura: 5,
  },
  {
    concepto: 35,
    monto: 3000,
    ["día de pago"]: "9/05/2024",
    numFactura: 6,
  },
  {
    concepto: 36,
    monto: 4000,
    ["día de pago"]: "29/06/2024",
    numFactura: 7,
  },
  {
    concepto: 37,
    monto: 6000,
    ["día de pago"]: "19/07/2024",
    numFactura: 8,
  },
];
export default function PagosPage() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [concepto, setConcepto] = useState("");
  const [monto, setMonto] = useState("");
  const [diaPago, setDiaPago] = useState("");
  const [numFactura, setNumFactura] = useState("");
  const { paymentsUsers, isLoadingPayments } = useSelector(
    (state) => state.payments
  );
  const dispatch = useDispatch();
  //console.log(paymentsUsers);

  const isOpen = (i, monto, concepto, diaPago, numFactura) => {
    //console.log(index);
    setOpen(!open);
    setMonto(monto);
    setConcepto(concepto);
    setDiaPago(diaPago);
    setNumFactura(numFactura);
  };
  const isOpenDelete = (concepto) => {
    setOpenDelete(!openDelete);
    setConcepto(concepto);
  };
  const onClose = () => {
    setOpen(!open);
  };
  const onCloseDelete = () => {
    setOpenDelete(!openDelete);
  };
  const onConfirm = () => {
    dispatch(
      listPayments(
        paymentsUsers.filter((payment) => payment.concepto !== concepto)
      )
    );
    setOpenDelete(!openDelete);
    console.log("Eliminando", concepto);
  };
  useEffect(() => {
    if (!isLoadingPayments) {
      dispatch(listPayments(feikData));
      dispatch(updateIsLoading(!isLoadingPayments));
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <p
        style={{
          fontSize: "40px",
          margin: "2rem 0 2rem 0",
          fontWeight: "500",
          textAlign: "start",
          width: "100%",
        }}
      >
        Pagos
      </p>

      <EditPayment
        isOpenWin={open}
        onClose={onClose}
        montoUser={monto}
        conceptoUser={concepto}
        diaPagoUser={diaPago}
        numFacturaUser={numFactura}
      />
      <DeletePayment
        isOpenWin={openDelete}
        onClose={onCloseDelete}
        conceptoUser={concepto}
        onConfirm={onConfirm}
      />
      <TableContainer
        style={{
          width: "100%",
        }}
      >
        <Table
          size="sm"
          style={{
            width: "100%",
          }}
        >
          <Thead>
            <Tr>
              <Th style={{ textAlign: "center", width: "400px" }}>Concepto</Th>
              <Th style={{ textAlign: "center", width: "400px" }}>Monto</Th>
              <Th style={{ textAlign: "center", width: "400px" }}>
                Día de pago
              </Th>
              <Th style={{ textAlign: "center", width: "400px" }}>
                Nro Factura
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paymentsUsers.map((data, i) => (
              <Tr key={i}>
                <Td style={{ textAlign: "center" }}>{data.concepto}</Td>
                <Td style={{ textAlign: "center" }}>{data.monto}</Td>
                <Td style={{ textAlign: "center" }}>{data["día de pago"]}</Td>
                <Td style={{ textAlign: "center" }}>{data.numFactura}</Td>
                <Td
                  style={{
                    display: "flex",
                    width: "200px",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    colorScheme="blue"
                    onClick={() =>
                      isOpen(
                        i,
                        data.monto,
                        data.concepto,
                        data["día de pago"],
                        data.numFactura
                      )
                    }
                  >
                    <EditIcon boxSize={5} />
                  </Button>

                  <Button
                    colorScheme="blue"
                    onClick={() => isOpenDelete(data.concepto)}
                  >
                    <DeleteIcon boxSize={5} />
                  </Button>
                </Td>
              </Tr>
            ))}
            {/* {payments.map((payment) => (
              <Tr>
                <Td>{payment.concept}</Td>
                <Td>{payment.amount}</Td>
                <Td>{payment.payday}</Td>
                <Td>{payment.billing}</Td>
              </Tr>
            ))} */}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
