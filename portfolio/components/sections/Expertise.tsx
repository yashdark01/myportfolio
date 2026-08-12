"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Tag from "@/components/ui/Tag";
import { expertiseGroups } from "@/data/site";

export default function Expertise() {
  return (
    <SectionWrapper id="expertise" label="Expertise" title="Where I Go Deep">
      <div className="grid gap-6 md:grid-cols-3">
        {expertiseGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="card-surface p-6"
          >
            <h3 className="text-lg font-semibold">{group.title}</h3>
            <p className="mt-1 text-sm text-text-muted">{group.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
