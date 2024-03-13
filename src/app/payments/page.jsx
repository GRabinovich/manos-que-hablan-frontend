"use client";
import {
  Spinner,
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
import { EditPayment } from "@/components/Payments/EditPayment";
import { DeletePayment } from "@/components/Payments/DeletePayment";
import { useDispatch, useSelector } from "react-redux";
import { listPayments, updateIsLoading } from "@/redux/features/paymentsSlice";
import { ListPayments } from "@/components/Payments/ListPayments";

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
  {
    concepto: 38,
    monto: 6300,
    ["día de pago"]: "29/07/2024",
    numFactura: 9,
  },
  {
    concepto: 48,
    monto: 16300,
    ["día de pago"]: "29/12/2024",
    numFactura: 10,
  },
  {
    concepto: 50,
    monto: 0,
    ["día de pago"]: "2/12/2024",
    numFactura: 11,
  },
  {
    concepto: 51,
    monto: 4560,
    ["día de pago"]: "12/05/2024",
    numFactura: 12,
  },
  {
    concepto: 52,
    monto: 5560,
    ["día de pago"]: "15/05/2024",
    numFactura: 13,
  },
  {
    concepto: 57,
    monto: 15560,
    ["día de pago"]: "25/07/2024",
    numFactura: 14,
  },
  {
    concepto: 58,
    monto: 15560,
    ["día de pago"]: "25/07/2024",
    numFactura: 14,
  },
  {
    concepto: 59,
    monto: 25560,
    ["día de pago"]: "23/07/2024",
    numFactura: 16,
  },
];
export default function PagosPage() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [concepto, setConcepto] = useState("");
  const [monto, setMonto] = useState("");
  const [diaPago, setDiaPago] = useState("");
  const [numFactura, setNumFactura] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
  const onEdit = () => {
    console.log("Editandooo");
  };

  useEffect(() => {
    if (!isLoadingPayments) {
      dispatch(listPayments(feikData));
      dispatch(updateIsLoading(!isLoadingPayments));
    }
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [paymentsUsers]);

  /* 
  {isLoadingPayments ? (
        "listo"
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}

  */

  return (
    <>
      {isLoadingPayments ? (
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

          <>
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
                    <Th style={{ textAlign: "center", width: "400px" }}>
                      Concepto
                    </Th>
                    <Th style={{ textAlign: "center", width: "400px" }}>
                      Monto
                    </Th>
                    <Th style={{ textAlign: "center", width: "400px" }}>
                      Día de pago
                    </Th>
                    <Th style={{ textAlign: "center", width: "400px" }}>
                      Nro Factura
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <ListPayments
                    paymentsUsers={paymentsUsers}
                    isOpen={isOpen}
                    isOpenDelete={isOpenDelete}
                  />
                </Tbody>
              </Table>
            </TableContainer>
          </>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Spinner
            thickness="5px"
            speed="0.85s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      )}
    </>
  );
}
