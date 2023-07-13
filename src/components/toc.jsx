/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useActiveId } from "../utils/useActiveId";




/* eslint-disable @typescript-eslint/explicit-function-return-type */
// TODO: Why is this rule on here? It's disabled in eslintrc
function getIds(items) {
    return items.reduce(function (acc, item) {
      if (item.url) {
        // url has a # as first character, remove it and add the raw CSS-id
        acc.push(item.url.slice(1));
      }
      if (item.items) {
        acc.push.apply(acc, getIds(item.items));
      }
      return acc;
    }, []);
  }
  function renderItems(items, activeId, isRecursiveCall) {
    return (
      <ol
        sx={{
          listStyle: `none`,
          padding: 0,
          pl: isRecursiveCall ? 8 : null,
          variant: isRecursiveCall ? undefined : `styles.TableOfContentsList`,
        }}
      >
        {items.map((item) => {
          // exit early if there is no url, that also means there can't be any item.items
          // Reason: heading levels should only ever increase by one level.
          if (!item.url) {
            return null;
          }
          return (
            <li key={item.url} sx={{ mt: isRecursiveCall ? 1 : 3 }}>
              <a
                href={item.url}
                sx={{
                  variant:
                    activeId === item.url.slice(1)
                      ? `styles.TableOfContentsList.link.active`
                      : `styles.TableOfContentsList.link`,
                }}
              >
                {item.title}
              </a>
              {item.items && renderItems(item.items, activeId, true)}
            </li>
          );
        })}
      </ol>
    );
  }

const TableOfContentsList= ({ tableOfContents }) => {
  const { items } = tableOfContents;
  const activeId = useActiveId(getIds(items));
  return renderItems(items, activeId);
};

export { TableOfContentsList };