import React, { FC } from "react";
import { useRouter } from "next/router";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { SmallPokemon } from "../../interfaces";

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const onclick = () => {
    router.push(`/name/${pokemon.name}`);
  };
  return (
    <Grid xs={12} sm={4} md={3} xl={2}>
      <Card hoverable clickable onClick={onclick}>
        <Card.Body css={{ padding: 1 }}>
          <Card.Image src={pokemon.img} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{pokemon.name}</Text>
            <Text>#{pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
