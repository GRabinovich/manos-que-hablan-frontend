import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Td, Tr } from "@chakra-ui/react";
import React from "react";

export const ListPayments = ({ paymentsUsers, isOpen, isOpenDelete }) => {
  return (
    <>
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
    </>
  );
};
