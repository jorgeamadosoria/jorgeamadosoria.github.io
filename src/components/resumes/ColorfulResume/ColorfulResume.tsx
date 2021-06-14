import React from "react";
import "./ColorfulResume.css";
import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap";
import EntryType from "../../../data/enums/EntryType";
import { ResumeProps, getIcon } from "../ResumeUtils";
import IconColor from "../../../data/enums/IconColor";

const ColorfulResume = ({ resume, relevance }: ResumeProps) => {
  const {
    name,
    positions,
    summary,
    showcase,
    contacts,
    languages,
    skills,
    entries,
  } = resume.prepareResume(relevance);
  const joinedPositions = positions
    .map((position) => position.value)
    .join(", ");

  return (
    <Container fluid>
      <Row className="pt-2">
        <Col xs={12}>
          <h3>{name.value}</h3>
          <Card.Subtitle className="mb-2 text-muted">
            <i>{joinedPositions}</i>
          </Card.Subtitle>
          <hr />
        </Col>
      </Row>
      <Row className="pt-2">
        <Col className="pl-3 pr-1" xs={5}>
          {summary.value}
        </Col>
        <Col
          className="border border-dark border-bottom-0 border-top-0 border-right-0"
          xs={4}
        >
          <Row className="pl-2">
            {contacts.map((contact, index) => (
              <Col xs={6} className="p-1 border-0" key={index}>
                <p className="text-break">
                  {contact.url && (
                    <a className="text-dark" target="blank" href={contact.url}>
                      {getIcon(contact.type, IconColor.COLOR)} &nbsp;
                      <span className="text-break">{contact.name}</span>
                    </a>
                  )}
                  {!contact.url && (
                    <>
                      {getIcon(contact.type, IconColor.COLOR)} &nbsp;
                      <span className="text-break">{contact.name}</span>
                    </>
                  )}
                </p>
              </Col>
            ))}
          </Row>
        </Col>
        <Col
          className="pl-3 pr-1 border border-dark border-bottom-0 border-top-0 border-right-0"
          xs={2}
        >
          <ListGroup variant="flush">
            {languages.map((language, index) => (
              <ListGroup.Item className="p-0 border-bottom-0 " key={index}>
                <h5>
                  <Badge
                    pill
                    variant="secondary"
                    className={
                      "colorful-" + language.shortLevel + " text-break"
                    }
                  >
                    {language.code}&nbsp;&nbsp;
                    <i>{language.level}</i>
                  </Badge>
                </h5>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <hr />
        </Col>
        {skills.map((skill, index) => (
          <Col xs={12} sm={6} md={4} lg={2} key={index}>
            <Badge pill className={"colorful-skill-" + skill.level}>
              <b>
                {skill.name}
                &nbsp;<i>({skill.level})</i>
              </b>
            </Badge>
          </Col>
        ))}
      </Row>
      <Row className="pb-3">
        <Col xs={12}>
          <hr />
        </Col>
      </Row>
      {entries.map((entry, index) => {
        const refText =
          entry.type !== EntryType.CERTIFICATION ? entry.reference.value : null;

        return (
          <Row key={index} className="ml-3">
            <Col
              xs={12}
              className={
                "colorful-" +
                entry.type +
                " pb-0 border border-dark border-right-0 border-bottom-0 border-top-0 colorful-entry"
              }
            >
              <div
                className={
                  "colorful-" +
                  entry.type +
                  " mx-auto colorful-timeline-icon border p-1 pt-2 pb-2 border-dark"
                }
              >
                {getIcon(entry.type, IconColor.COLOR)}
              </div>
              <p
                className={
                  "colorful-" +
                  entry.type +
                  " h5 colorful-entry-header border border-left-0 border-dark d-inline-flex pl-3 pr-3"
                }
              >
                &nbsp;&nbsp;&nbsp;&nbsp;
                {entry.fromDate.toLocaleDateString()}
                {entry.toDate &&
                  " to ".concat(entry.toDate.toLocaleDateString())}
                &nbsp;&nbsp;
                {entry.name}&nbsp;@&nbsp;
                {refText ? (
                  <a
                    className="text-dark"
                    target="blank"
                    href={entry.reference.value}
                  >
                    {entry.entity}&nbsp;
                  </a>
                ) : (
                  <>
                    {entry.entity}
                    &nbsp;&nbsp;
                  </>
                )}
              </p>
              <p className="pl-4 ml-3">{entry.description.value}</p>
              <p className="pl-4 ml-3">
                {!refText && (
                  <>
                    <a
                      className="colorfulreference"
                      target="blank"
                      href={entry.reference.value}
                    >
                      Reference
                    </a>
                  </>
                )}
              </p>
            </Col>
            <Col
              className=" pb-0 pt-3 pb-3 border border-dark border-bottom-0 border-top-0 border-right-0"
              xs={12}
            ></Col>
          </Row>
        );
      })}
      <Row className="pl-3 pr-1 ">
        <Col xs={12}>
          <hr />
        </Col>
        <Col xs={12} className="p-1 d-flex border-0">
          <Row>
            {showcase.map((show, index) => (
              <Col
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="p-1 border-0 flex-1"
                key={index}
              >
                <a target="blank" className="text-dark" href={show.url}>
                  <Card className="colorful-portfolio-border h-100">
                    <Card.Header className="colorful-portfolio-bg">
                      <Card.Title className="m-0">
                        {getIcon(show.type, IconColor.COLOR)}&nbsp;
                        <span className="fs-4">{show.name}</span>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>{show.description}</Card.Body>
                    <Card.Footer className="colorful-portfolio-bg d-flex align-items-end flex-grow-0 flex-shrink-1">
                      <span className="small">{show.language}</span>
                    </Card.Footer>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ColorfulResume;
