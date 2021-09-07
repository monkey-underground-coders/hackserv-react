import React, { useEffect, useRef, useState } from "react";
import VK, { Group } from "react-vk";
import { debounce as _debounce } from "lodash";
import BigProgress from "@components/BigProgress";
import { Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const innerFunc = () => setWidth(window.innerWidth);
    const handleResize = _debounce(innerFunc, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return width;
};

const InnerVkWidget = () => {
  const divRef = useRef();
  const div = divRef.current;
  const width = useWindowSize();

  return (
    <div ref={divRef} key={width}>
      <Group
        groupId={203881768}
        elementId="vk_groups"
        options={{
          mode: 4,
          width: div?.offsetWidth ?? "auto",
          height: div?.offsetHeight,
        }}
      />
    </div>
  );
};

const RenderNotifier = ({ notify }) => {
  useEffect(() => notify(), [notify]);
  return <></>;
};

const VkWidget = () => {
  const [vkLoaded, setVkLoaded] = useState(false);
  const [error, setError] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (!vkLoaded && !error) {
      const timer = setTimeout(() => {
        if (!vkLoaded) {
          setError(true);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  });

  if (vkLoaded || !error) {
    return (
      <>
        <VK>
          <RenderNotifier notify={() => setVkLoaded(true)} />
          <InnerVkWidget />
        </VK>
        {!vkLoaded && (
          <div className={classes.center}>
            <BigProgress />
          </div>
        )}
      </>
    );
  } else {
    return (
      <div className={classes.center}>
        <Link href="https://vk.com/monkeyhackers">Перейти к новостям</Link>
      </div>
    );
  }
};

export default VkWidget;
